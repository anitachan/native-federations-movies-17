import * as fs from 'fs';
import * as path from 'path';
import { FileConditionBuilder, filesOfProject } from 'tsarch';
import 'tsarch/dist/jest';

let files: FileConditionBuilder;
let domainItems: string[] = [];
let uiItems: string[] = [];

const domainPath = `${path.join(__dirname, '../..')}/src/app/domain`;
const uiPath = `${path.join(__dirname, '../..')}/src/app/ui`;

if (fs.existsSync(domainPath)) {
  domainItems = fs
    .readdirSync(domainPath, { withFileTypes: true })
    .filter((item: fs.Dirent) => item.isDirectory())
    .map(({ name }) => name);
}

if (fs.existsSync(uiPath)) {
  uiItems = fs
    .readdirSync(uiPath, { withFileTypes: true })
    .filter((item: fs.Dirent) => item.isDirectory())
    .map(({ name }) => name);
}

describe('Architecture tests', () => {
  beforeAll(() => {
    files = filesOfProject(path.join(__dirname, '../..') + '/tsconfig.arch.json');
  });

  uiItems.forEach((uiDirectory: string) => {
    test(`should not access ui/${uiDirectory} to infraestructure layer`, async () => {
      const rule = files.inFolder(`app/ui/${uiDirectory}`).shouldNot().dependOnFiles().inFolder('app/infraestructure');

      await expect(rule).toPassAsync();
    });
  });

  uiItems.forEach((uiDirectory: string) => {
    test(`should not access infraestructure layer to ui/${uiDirectory} folder`, async () => {
      const rule = files.inFolder('app/infraestructure').shouldNot().dependOnFiles().inFolder(`app/ui/${uiDirectory}`);

      await expect(rule).toPassAsync();
    });
  });

  uiItems.forEach((uiDirectory: string) => {
    test(`should not access domain layer to ui/${uiDirectory} folder`, async () => {
      const rule = files.inFolder('app/domain').shouldNot().dependOnFiles().inFolder(`app/ui/${uiDirectory}`);

      await expect(rule).toPassAsync();
    });
  });

  test(`should not access domain layer to infraestructure folder`, async () => {
    const rule = files.inFolder('app/domain').shouldNot().dependOnFiles().inFolder('app/infraestructure');

    await expect(rule).toPassAsync();
  });

  uiItems.forEach((uiDirectory: string) => {
    domainItems.forEach((directory: string) => {
      test(`should not access ui/${uiDirectory} to domain/${directory}/gateways`, async () => {
        const rule = files.inFolder(`app/ui/${uiDirectory}`).shouldNot().dependOnFiles().inFolder(`app/domain/${directory}/gateways`);

        await expect(rule).toPassAsync();
      });
    });
  });
});
