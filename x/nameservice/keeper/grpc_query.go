package keeper

import (
	"github.com/mechu/blog/x/nameservice/types"
)

var _ types.QueryServer = Keeper{}
