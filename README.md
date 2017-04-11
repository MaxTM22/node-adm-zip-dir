Made in service of zipping and unzipping the `webhook-generate` repo. Which needs to get zipped and uploaded, to be pulled down on `wh create`, which unzips it.

`adm-zip` is the same library that `wh create` uses. Unfortunately, the `zip` application in OS X can not be uncompressed by `adm-zip`. When trying, we get an `INVALID_FORMAT` error.
