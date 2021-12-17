package cli

import (
	"strconv"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/mechu/blog/x/blog/types"
)

var _ = strconv.Itoa(0)

func CmdCreatePost() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-post [title] [body] [body2] [num]",
		Short: "Broadcast message createPost",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argTitle := args[0]
			argBody := args[1]
			argBody2 := args[2]
			argNum, _ := strconv.ParseUint(args[3], 10, 32)

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreatePost(
				clientCtx.GetFromAddress().String(),
				argTitle,
				argBody,
				argBody2,
				argNum,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
