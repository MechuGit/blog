package keeper

import (
	"github.com/mechu/blog/x/blog/types"
)

var _ types.QueryServer = Keeper{}
