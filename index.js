const http = require('node:http')
const path = require('node:path')
const readline = require('node:readline/promises')
const fsPromises = require('node:fs/promises')

const {foo: helperFoo} = require('./helpers/helper');

const foo = async () => {
    //  - http -
    // const server = http.createServer((req, res) => {
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     res.end(JSON.stringify({
    //         data: 'Hello World'
    //     }));
    // });
    // server.listen(3000);

//     - path -

    // const pathToFile = __filename;
    // console.log(pathToFile);
    // console.log(path.dirname(pathToFile));
    // console.log(path.extname(pathToFile));
    // console.log(path.basename(pathToFile));
    // console.log(path.parse(pathToFile));

//     - readline -

    // const rlInstance = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // })
    // const name = await rlInstance.question('Name?');
    // console.log(`Your name is ${name}`);
    // process.exit(0);

//     - fs -

    // const pathToFile = path.resolve(__dirname, 'foo.txt');
    // await fsPromises.writeFile(pathToFile, 'Hello World!');
    await fsPromises.mkdir(path.join(__dirname, 'mew-folder'), {recursive: true});
    // await fsPromises.mkdir(path.join(__dirname, 'baseFolder'));
    await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'folder1'), {recursive: true});
    await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'folder2'), {recursive: true});
    await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'folder3'), {recursive: true});
    await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'folder4'), {recursive: true});
    await fsPromises.mkdir(path.join(__dirname, 'baseFolder', 'folder5'), {recursive: true});
    await fsPromises.mkdir(path.join(__dirname, 'baseFolder','folder1', 'f1-file1.txt'), {recursive: true});
};

void foo();


