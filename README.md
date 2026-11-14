# Free Background Remover

Browser-based background removal for [free-background-remover.web-free.site](https://free-background-remover.web-free.site).

Forked from [addyosmani/bg-remove](https://github.com/addyosmani/bg-remove) (MIT). Default segmentation model: [BiRefNet ONNX](https://huggingface.co/onnx-community/BiRefNet_512x512-ONNX) (MIT). Optional WebGPU: [MODNet](https://huggingface.co/Xenova/modnet) (Apache-2.0).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Static output in `dist/`. Cloudflare config in `wrangler.toml` (do not deploy from CI without approval).

## License

Application code: MIT (see [LICENSE.md](./LICENSE.md)).