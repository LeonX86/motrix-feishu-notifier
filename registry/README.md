# Registry submission draft

This folder is a copy-ready draft for
[motrixapp/plugin-registry](https://github.com/motrixapp/plugin-registry).

After the first GitHub Release exists:

1. Copy `leonx86.feishu-notifier.json` to the registry repo as:
   `plugins/leonx86.feishu-notifier.json`
2. Copy `assets/leonx86.feishu-notifier/icon.png` to the registry repo as:
   `assets/leonx86.feishu-notifier/icon.png`
3. Replace `LeonX86/motrix-feishu-notifier` if your GitHub owner/repo differs.
4. Update `version`, `package.url`, `package.sha256`, `package.size`, and
   `updatedAt` for every new release.
5. Open a PR.

The current draft matches:

```text
dist/leonx86.feishu-notifier-0.5.0.moext
sha256 b81bc5eebb8694a9e2aa37e44b1dd5104f15ca4ed73a109c75e2759747b5b497
size   6870
```

If you change `motrix-plugin.json` or `src/index.ts` and rebuild, recompute
the hash and size before submitting the registry PR.