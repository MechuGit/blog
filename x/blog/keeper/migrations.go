package keeper

import (
	"encoding/binary"
	"fmt"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/mechu/blog/x/blog/types"
)

// Migrator is a struct for handling in-place store migrations.
type Migrator struct {
	keeper Keeper
}

// NewMigrator returns a new Migrator.
func NewMigrator(keeper Keeper) Migrator {
	return Migrator{keeper: keeper}
}

func (m Migrator) Migrate1to2(ctx sdk.Context) error {
	return nil
}

func (m Migrator) Migrate3to4(ctx sdk.Context) error {
	fmt.Printf("we fked up boyz")
	return nil // to do traverse through store of old and save news with placeholder
}

func (m Migrator) Migrate4to5(ctx sdk.Context) error {
	fmt.Printf("well done!\n")
	return nil // to do traverse through store of old and save news with placeholder
}

func (m Migrator) Migrate5to6(ctx sdk.Context) error {
	return migrateStore(ctx, m.keeper)
}

func migrateStore(ctx sdk.Context, k Keeper) error {
	store := ctx.KVStore(k.storeKey)
	// Get the part of the store that keeps posts (using post key, which is "Post-value-")
	postStore := prefix.NewStore(store, []byte(types.PostKey))
	iterator := postStore.Iterator(nil, nil)
	defer iterator.Close()
	var posts []types.Post
	for ; iterator.Valid(); iterator.Next() {
		var post types.Post
		k.cdc.MustUnmarshal(iterator.Value(), &post)
		post.NewField = "legacy!"
		posts = append(posts, post)
	}
	for _, post := range posts {
		tmp := post
		byteKey := make([]byte, 8)
		binary.BigEndian.PutUint64(byteKey, post.Id)
		byteValue := k.cdc.MustMarshal(&tmp)
		postStore.Set(byteKey, byteValue)

	}
	return nil
}
