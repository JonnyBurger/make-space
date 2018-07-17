---
id: ethereum-chaindata-testnet
title: Delete Ethereum testnet chain data
sidebar_label: ethereum-chaindata-testnet
---

## Available platforms

- macOS

## Command

```sh
rm -rfv ~/Library/Ethereum/testnet/geth/chaindata
```

## Description

The Ethereum chain data folder comes from Ethereum desktop clients such as Ethereum Wallet / Mist.

Deleting the chain data can free up ~50GB of space, but will require a lengthy resync.

You will not lose your Ether when you delete the chaindata.

This strategy concerns the chain data of the testnet. For mainnet, see
[ethereum-chaindata](ethereum-chaindata)

## See also

- [If I delete chaindata do I lose the ether in my wallet?](https://www.reddit.com/r/ethereum/comments/69py8q/if_i_delete_chaindata_do_i_lose_the_ether_in_my/)

- [ethereum-chaindata](ethereum-chaindata)
- [litecoin-chaindata](litecoin-chaindata)
