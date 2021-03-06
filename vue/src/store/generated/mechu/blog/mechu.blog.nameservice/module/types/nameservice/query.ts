/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Whois } from "../nameservice/whois";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";

export const protobufPackage = "mechu.blog.nameservice";

export interface QueryGetWhoisRequest {
  index: string;
}

export interface QueryGetWhoisResponse {
  whois: Whois | undefined;
}

export interface QueryAllWhoisRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllWhoisResponse {
  whois: Whois[];
  pagination: PageResponse | undefined;
}

const baseQueryGetWhoisRequest: object = { index: "" };

export const QueryGetWhoisRequest = {
  encode(
    message: QueryGetWhoisRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetWhoisRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetWhoisRequest } as QueryGetWhoisRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetWhoisRequest {
    const message = { ...baseQueryGetWhoisRequest } as QueryGetWhoisRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    return message;
  },

  toJSON(message: QueryGetWhoisRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetWhoisRequest>): QueryGetWhoisRequest {
    const message = { ...baseQueryGetWhoisRequest } as QueryGetWhoisRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    return message;
  },
};

const baseQueryGetWhoisResponse: object = {};

export const QueryGetWhoisResponse = {
  encode(
    message: QueryGetWhoisResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.whois !== undefined) {
      Whois.encode(message.whois, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetWhoisResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetWhoisResponse } as QueryGetWhoisResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.whois = Whois.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetWhoisResponse {
    const message = { ...baseQueryGetWhoisResponse } as QueryGetWhoisResponse;
    if (object.whois !== undefined && object.whois !== null) {
      message.whois = Whois.fromJSON(object.whois);
    } else {
      message.whois = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetWhoisResponse): unknown {
    const obj: any = {};
    message.whois !== undefined &&
      (obj.whois = message.whois ? Whois.toJSON(message.whois) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetWhoisResponse>
  ): QueryGetWhoisResponse {
    const message = { ...baseQueryGetWhoisResponse } as QueryGetWhoisResponse;
    if (object.whois !== undefined && object.whois !== null) {
      message.whois = Whois.fromPartial(object.whois);
    } else {
      message.whois = undefined;
    }
    return message;
  },
};

const baseQueryAllWhoisRequest: object = {};

export const QueryAllWhoisRequest = {
  encode(
    message: QueryAllWhoisRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllWhoisRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllWhoisRequest } as QueryAllWhoisRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllWhoisRequest {
    const message = { ...baseQueryAllWhoisRequest } as QueryAllWhoisRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllWhoisRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllWhoisRequest>): QueryAllWhoisRequest {
    const message = { ...baseQueryAllWhoisRequest } as QueryAllWhoisRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllWhoisResponse: object = {};

export const QueryAllWhoisResponse = {
  encode(
    message: QueryAllWhoisResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.whois) {
      Whois.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllWhoisResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllWhoisResponse } as QueryAllWhoisResponse;
    message.whois = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.whois.push(Whois.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllWhoisResponse {
    const message = { ...baseQueryAllWhoisResponse } as QueryAllWhoisResponse;
    message.whois = [];
    if (object.whois !== undefined && object.whois !== null) {
      for (const e of object.whois) {
        message.whois.push(Whois.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllWhoisResponse): unknown {
    const obj: any = {};
    if (message.whois) {
      obj.whois = message.whois.map((e) => (e ? Whois.toJSON(e) : undefined));
    } else {
      obj.whois = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllWhoisResponse>
  ): QueryAllWhoisResponse {
    const message = { ...baseQueryAllWhoisResponse } as QueryAllWhoisResponse;
    message.whois = [];
    if (object.whois !== undefined && object.whois !== null) {
      for (const e of object.whois) {
        message.whois.push(Whois.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a whois by index. */
  Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse>;
  /** Queries a list of whois items. */
  WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Whois(request: QueryGetWhoisRequest): Promise<QueryGetWhoisResponse> {
    const data = QueryGetWhoisRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mechu.blog.nameservice.Query",
      "Whois",
      data
    );
    return promise.then((data) =>
      QueryGetWhoisResponse.decode(new Reader(data))
    );
  }

  WhoisAll(request: QueryAllWhoisRequest): Promise<QueryAllWhoisResponse> {
    const data = QueryAllWhoisRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mechu.blog.nameservice.Query",
      "WhoisAll",
      data
    );
    return promise.then((data) =>
      QueryAllWhoisResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
