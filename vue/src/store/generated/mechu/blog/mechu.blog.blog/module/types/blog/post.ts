/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "mechu.blog.blog";

export interface Post {
  creator: string;
  id: number;
  title: string;
  body: string;
  body2: string;
  num: number;
  empty: string;
  newField: string;
}

const basePost: object = {
  creator: "",
  id: 0,
  title: "",
  body: "",
  body2: "",
  num: 0,
  empty: "",
  newField: "",
};

export const Post = {
  encode(message: Post, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.body !== "") {
      writer.uint32(34).string(message.body);
    }
    if (message.body2 !== "") {
      writer.uint32(42).string(message.body2);
    }
    if (message.num !== 0) {
      writer.uint32(48).uint64(message.num);
    }
    if (message.empty !== "") {
      writer.uint32(58).string(message.empty);
    }
    if (message.newField !== "") {
      writer.uint32(66).string(message.newField);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Post {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePost } as Post;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.title = reader.string();
          break;
        case 4:
          message.body = reader.string();
          break;
        case 5:
          message.body2 = reader.string();
          break;
        case 6:
          message.num = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.empty = reader.string();
          break;
        case 8:
          message.newField = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Post {
    const message = { ...basePost } as Post;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body);
    } else {
      message.body = "";
    }
    if (object.body2 !== undefined && object.body2 !== null) {
      message.body2 = String(object.body2);
    } else {
      message.body2 = "";
    }
    if (object.num !== undefined && object.num !== null) {
      message.num = Number(object.num);
    } else {
      message.num = 0;
    }
    if (object.empty !== undefined && object.empty !== null) {
      message.empty = String(object.empty);
    } else {
      message.empty = "";
    }
    if (object.newField !== undefined && object.newField !== null) {
      message.newField = String(object.newField);
    } else {
      message.newField = "";
    }
    return message;
  },

  toJSON(message: Post): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    message.body !== undefined && (obj.body = message.body);
    message.body2 !== undefined && (obj.body2 = message.body2);
    message.num !== undefined && (obj.num = message.num);
    message.empty !== undefined && (obj.empty = message.empty);
    message.newField !== undefined && (obj.newField = message.newField);
    return obj;
  },

  fromPartial(object: DeepPartial<Post>): Post {
    const message = { ...basePost } as Post;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body;
    } else {
      message.body = "";
    }
    if (object.body2 !== undefined && object.body2 !== null) {
      message.body2 = object.body2;
    } else {
      message.body2 = "";
    }
    if (object.num !== undefined && object.num !== null) {
      message.num = object.num;
    } else {
      message.num = 0;
    }
    if (object.empty !== undefined && object.empty !== null) {
      message.empty = object.empty;
    } else {
      message.empty = "";
    }
    if (object.newField !== undefined && object.newField !== null) {
      message.newField = object.newField;
    } else {
      message.newField = "";
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}