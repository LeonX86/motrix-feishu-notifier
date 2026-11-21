# Registry submission draft

This folder is a copy-ready draft for
[motrixapp/plugin-registry](https://github.com/motrixapp/plugin-registry).

After the first GitHub Release exists:

1. Copy `leonx86.feishu-notifier.json` to the registry repo as:
   `plugins/leonx86.feishu-notifier.json`
2. Replace `LeonX86/motrix-feishu-notifier` if your GitHub owner/repo differs.
3. Update `version`, `package.url`, `package.sha256`, `package.size`, and
   `updatedAt` for every new release.
4. Open a PR.

The current release asset matches:

```text
leonx86.feishu-notifier-0.5.0.moext
sha256 242598a4792e52a89b8aae83d15745a5db6cce06437ec5e304ea66908df8f913
size   6865
```

Use the hash and size of the GitHub Release asset. A local Windows build may
differ slightly because of line endings.

The optional listing icon is prepared at
`assets/leonx86.feishu-notifier/icon.png`. To use it, copy it to the registry
repo at the same path and add to the entry:

```json
"icon": "https://dl.motrix.app/registry/assets/leonx86.feishu-notifier/icon.png"
```

The initial PR intentionally contains only the JSON entry.