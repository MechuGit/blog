rm -rf ~/.blog
blogd keys add my_validator_2 --keyring-backend test
MY_VALIDATOR_ADDRESS=$(blogd keys show my_validator_2 -a --keyring-backend test)
blogd init slave_node
apt-get install jq
jq '.app_state.gov.voting_params.voting_period = "120s"' ~/.blog/config/genesis.json > temp.json && mv temp.json ~/.blog/config/genesis.json
blogd add-genesis-account $MY_VALIDATOR_ADDRESS 100000000000stake
blogd gentx my_validator_2 1000000000stake --chain-id blog --keyring-backend test
