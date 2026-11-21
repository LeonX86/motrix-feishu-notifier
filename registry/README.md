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

The current release asset matches:

```text
leonx86.feishu-notifier-0.5.0.moext
sha256 242598a4792e52a89b8aae83d15745a5db6cce06437ec5e304ea66908df8f913
size   6865
```

Use the hash and size of the GitHub Release asset. A local Windows build may
differ slightly because of line endings. If you change `motrix-plugin.json` or
`src/index.ts` and publish a new release, update the hash and size before
submitting the registry PR.