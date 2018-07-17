---
id: litecoin-chaindata
sidebar_label: litecoin-chaindata
title: Delete Litecoin chain data
---

## Available platforms

- macOS

## Command

```sh
rm -rfv "~/Library/Application Support/Litecoin/block"
```

## Description

The Litecoin chain data folder comes from the [Litecoin Core desktop client](https://litecoin.org/).

Deleting the chain data can free up more than 12GB of data, but will require a lengthy resync.

You will not lose your Litecoin when you delete the chaindata.

## See also

- [Litecoin: Data directory](https://litecoin.info/index.php/Data_directory)
- [ethereum-chaindata](ethereum-chaindata)
- [ethereum-chaindata-testnet](ethereum-chaindata-testnet)
