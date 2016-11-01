var webpack = require("webpack");
var path = require("path");

var compile = opt => new Promise((resolve, reject) => webpack(opt, (err, stats) => {
    if (err) {
        console.error(err);
        reject(err);
    } else {
        process.stdout.write(stats.toString({
            colors: true,
            chunks: true,
            modules: false,
            chunkModules: false,
            reasons: true,
            cached: false,
            cachedAssets: false,
        }) + "\n");
        resolve(stats.toJson());
    }
}));

var options = {
    entry: {
        table: "./src/table.js",
        execute: "./src/snippet-execute.js",
        index_template: "html?interpolate!./src/index-template.html",
    },
    output: {
        filename: "[name]-[chunkhash].js",
        path: "./package",
        publicPath: "https://mayorovp.github.io/codegolf/",
    },
    plugins: [
      //new webpack.optimize.UglifyJsPlugin({minimize: true})
      new require('copy-webpack-plugin')([
          { from: 'static' },
      ]),
    ],
    module: {
        loaders: [
          {
              test: /\.js$/,
              include: [
                  path.resolve(__dirname, "src"),
              ],
              loader: 'babel',
              query: {
                  presets: ['es2015'],
              },
          },
        ],
    },
    externals: {
        'assetsByChunkName': 'assetsByChunkName',
    },
};

compile(options).then(s1 => {
    var assetsByChunkName = {};
    for (var k in s1.assetsByChunkName)
        if (s1.assetsByChunkName.hasOwnProperty(k))
            assetsByChunkName[k] = {
                localPath: s1.assetsByChunkName[k],
                publicPath: options.output.publicPath + s1.assetsByChunkName[k],
            };

    var fs = require("fs");

    try {
        var code = fs.readFileSync(options.output.path + "/" + s1.assetsByChunkName.index_template);
        var content = require("vm").runInNewContext(`assetsByChunkName => ${code}`)(assetsByChunkName);
        fs.writeFileSync(options.output.path + "/index.html", content);
    } catch (ex) {
        console.error(ex);
    }
})

