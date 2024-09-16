import LoaderFactory, { LoaderType } from "./loaders/loader-factory.ts";
import DataLoader, { TLoaderConfig } from "./loaders/data-loader.interface.ts";

class DataIngestionService {
  constructor() {}

  async ingest(
    source: string,
    type: LoaderType,
    config?: TLoaderConfig,
  ): Promise<void> {
    const loader: DataLoader = LoaderFactory.createLoader(type);
    const document = await loader.load(source);
  }
}
