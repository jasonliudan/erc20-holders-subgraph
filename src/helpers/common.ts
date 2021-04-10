import { BigInt, Address } from '@graphprotocol/graph-ts'
import { store } from "@graphprotocol/graph-ts/index"
import { Holder } from "../../generated/schema"


export const ZERO_ADDRESS = Address.fromHexString("0x0000000000000000000000000000000000000000")
export const DEAD_ADDRESS = Address.fromHexString("0x000000000000000000000000000000000000dead")
export const BONDLY_ADDRESS = Address.fromHexString("0xd2dda223b2617cb616c1580db421e4cfae6a8a85")
export const BONDLY_PAIR_ADDRESS = Address.fromHexString("0x9dc696f1067a6b9929986283f6d316be9c9198fd")

export const ZERO = BigInt.fromI32(0);
export const ONE = BigInt.fromI32(1);

export function removeEmptyEntity(entityName: string, id: string): void {
    store.remove(entityName, id);
}
export function getHolder(address: Address): Holder {
    let holder = Holder.load(address.toHexString())
    if (holder == null) {
        holder = new Holder(address.toHexString())
        holder.address = address.toHex()
        holder.balance = ZERO
    }
    return holder as Holder;
}