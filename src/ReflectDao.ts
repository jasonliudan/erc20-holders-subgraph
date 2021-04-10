import { BigInt, Address } from '@graphprotocol/graph-ts'
import { Transfer } from '../generated/ReflectDao/ReflectDao'
import { Holder } from '../generated/schema'
import { getHolder, removeEmptyEntity } from './helpers/common';

export const ZERO = BigInt.fromI32(0);
export const ZERO_ADDRESS = Address.fromHexString("0x0000000000000000000000000000000000000000");

export function handleTransfer(event: Transfer): void {
    if (event.block.number.toI32() <= 12208496) {
        let fromHolder = getHolder(event.params.from)
        fromHolder.balance = fromHolder.balance.minus(event.params.value)

        if (fromHolder.balance.isZero()) {
            removeEmptyEntity('Holder', event.params.from.toHexString())
        } else {
            fromHolder.save()
        }

        let toHolder = getHolder(event.params.to)
        toHolder.balance = toHolder.balance.plus(event.params.value)
        toHolder.save()
    }
}
