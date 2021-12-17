## In-Place Store Migration (Cosmos-SDK v0.44+) 

## Chain Initialization
Scripts included, run in this order:


    (node1): init_chain_slave.sh
    (node1): init_gentx_slave.sh                                 (copy slave gentx to shared space)
   
    (node2): init_chain_master.sh
    (node2): cp /workspaces/vaiot_blog/blog/gentxs/* ~/.blog/config/gentx
    (node2): blogd add-genesis-account <slave_addr> 100000000000stake
    (node2): init_gentx_master.sh                                 (run collect-gentxs and copy genesis to shared space)

    (node1): init_gentx_slave_2.sh                                (pull master's genesis)

TODO: simplify/improve


## Upgrade Timeline (and Voting):

In order to initiate a blockchain upgrade, the first step is for the validators to agree on it. This is done via a upgrade-proposal vote. 

    vaiotd tx gov submit-proposal software-upgrade v2 --upgrade-height 42069 --from my_validator --keyring-backend test --title tit --description desc 
    vaiotd tx gov deposit 1 10000000stake --from my_validator --keyring-backend test 
    vaiotd tx gov vote 1 yes --from my_validator --keyring-backend test

Few caveats:

 - The default voting time is 2 days (which means that once the proposal is submitted, the results are evaluated only then)
It's useful for testing to change the original genesis file to lower this time:
This could be done via:
`jq '.app_state.gov.voting_params.voting_period = "120s"' genesis.json > temp.json && mv temp.json genesis.json`
 - If proposal refers to an old chain height -> it isn't recorded at all
 - If upgrade voting doesn't end by reaching given height -> the vote is
   automatically FAILED after the voting time ends

Important to understand: 
Upgrade-proposal is sent to the old blockchain's binary. It the vote passes, the binary automatically stops at the height, scheduling an upgrade. The old binary is completely unaware of the new changes, only the fact that there should be an upgrade performed. (old binary is expected to store the information about the upgrade-proposal and exit) 
The operator is expected to obtain a new binary which introduces the changes, including all the upgrade handlers and run it.
This process could be automated using cosmovisor, which is able to stop old binary, either download a new binary (or the code + build it) and then restart the chain using the new binary.

It's useful to conceptually separate the code necessary to be executed upon restarting the updated binary into 2 areas:

## "Upgrading an app":

To handle an upgrade, the app needs to set a handler for the upgrade (given upgrade's name declared in the upgrade-proposal) - this is done inside App's constructor:

    app.UpgradeKeeper.SetUpgradeHandler("newmodule", func(ctx sdk.Context, plan upgradetypes.Plan, vm module.VersionMap) (module.VersionMap, error) { 
	    //additional app-wide upgrade logic 
	    return app.mm.RunMigrations(ctx, cfg, vm)
    })

The handler must end with a call to module manager which in turn will run the second part, the intended migration scripts for the modules.

## "Upgrading a module":

A module is responsible for registering it's migration scripts inside the `RegisterService` method:

    func (am AppModule) RegisterServices(cfg module.Configurator) {
	    ...
	    m := keeper.NewMigrator(am.keeper)
	    err := cfg.RegisterMigration(types.ModuleName, 1, m.Migrate1to2)
	    if err != nil {
		    panic(err)
	    }
	}
Notice that the migration function itself is encapsulated in a Migrator object, this is because it has to have a certain signature `(ctx sdk.Context) error` and the migrator is used to passed in any additional information  (usually module's keeper)

Every module is characterized by it's code version (integer), this is declared by the module creator in `ConsensusVersion` method:

    func (AppModule) ConsensusVersion() uint64 { return  3 }
    
These versions are collected, managed and updated by x/upgrade module. 
Every module's version is first collected during chain initialization:

    func (app *App) InitChainer(ctx sdk.Context, req abci.RequestInitChain) abci.ResponseInitChain {
    ...
    app.UpgradeKeeper.SetModuleVersionMap(ctx, app.mm.GetVersionMap())
    return app.mm.InitGenesis(ctx, app.appCodec, genesisState)
    }

Then, whenever an upgrade is scheduled and executed, more specifically inside:
`app.UpgradeKeeper.SetUpgradeHandler()` -> `module.Manager.RunMigrations()` -> `configurator.runModuleMigrations()` 
the running module versions are compared to the versions that the modules are currently reporting. For every step of difference (it is required that module versions increase by 1 every time a module introduces a breaking change requiring migration) a proper migration function is automatically executed (registered via the above `cfg.RegisterMigration`)

Caveat: every module with version > 1 is required to have any migration function, even if a certain upgrade does not change that module. Apart from that, of course all functions between old and new version must be registered.

## Adding brand new modules:

Introducing new modules is very similar to the process above. The modules need to be instantiated in every regular place (inside App constructor), which means created, populated with a keeper, added to module manager, added to `SetOrder...` functions, etc.. Then when after the regular `SetUpgradeHandler` in app.go, an additional piece of code is required e.g.:
    
    app.UpgradeKeeper.SetUpgradeHandler("newmodule", func(ctx sdk.Context, plan upgradetypes.Plan, vm module.VersionMap) (module.VersionMap, error) {
	    return app.mm.RunMigrations(ctx, cfg, vm)
    })
 
    upgradeInfo, err := app.UpgradeKeeper.ReadUpgradeInfoFromDisk() 
	if err != nil {
		panic(err)
    } 
    if upgradeInfo.Name == "newmodule" && !app.UpgradeKeeper.IsSkipHeight(upgradeInfo.Height) {
	    storeUpgrades := storetypes.StoreUpgrades{
		    Added: []string{"nameservice"},
	    }
    app.SetStoreLoader(upgradetypes.UpgradeStoreLoader(upgradeInfo.Height, &storeUpgrades))
    }

## Data changes: (protobuf):

Protocol buffers when used correctly are generally backward (and forward) compatible which means that even if they are to be updated it is usually possible to do so without keeping the old struct definition. 
-   you must not change the tag numbers nor types of any existing fields.
-   you may delete fields.
-   you may add new fields but you must use fresh tag numbers (i.e. tag numbers that were never used in this protocol buffer, not even by deleted fields).

When following these rules, code expecting old structure will happily read new messages and simply ignore any new fields. Code expecting fields that were deleted will simply have their default value. (I guess it should not be affected in any way by cosmos-sdk storage mechanisms)
More information available here: https://developers.google.com/protocol-buffers/docs/gotutorial#extending-a-protocol-buffer


## Operator View / Cosmovisor
TODO

## Common Downfalls:
TODO



