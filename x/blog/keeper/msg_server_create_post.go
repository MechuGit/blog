package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/mechu/blog/x/blog/types"
)

func (k msgServer) CreatePost(goCtx context.Context, msg *types.MsgCreatePost) (*types.MsgCreatePostResponse, error) {
	// Get the context
	fmt.Printf("HeyYou!")
	ctx := sdk.UnwrapSDKContext(goCtx)
	// Create variable of type Post
	var post = types.Post{
		Creator: msg.Creator,
		Title:   msg.Title,
		Body:    msg.Body,
		Body2:   msg.Body2,
		Num:     msg.Num,
	}
	// Add a post to the store and get back the ID
	id := k.AppendPost(ctx, post)
	// Return the ID of the post
	return &types.MsgCreatePostResponse{Id: id}, nil
}
