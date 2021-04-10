import { BigInt, Address } from '@graphprotocol/graph-ts'
import { Transfer } from '../generated/ReflectDao/ReflectDao'
import { Holder } from '../generated/schema'

export const ZERO = BigInt.fromI32(0);
export const ZERO_ADDRESS = Address.fromHexString("0x0000000000000000000000000000000000000000");

export function handleTransfer(event: Transfer): void {
    let holder = new Holder(event.address.toHexString())
    holder.save()
}
