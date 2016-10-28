var webpack = require("webpack");
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
    entry: "./src/table.js",
    output: {
        filename: "[hash].js",
        path: "./package",
        publicPath: "http://mayorovp.github.io/codegolf/",
    },
    plugins: [
      //new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    module: {
        loaders: [
          {
              test: /\.js$/,
              loader: 'babel',
              query: {
                  presets: ['es2015'],
              },
          },
        ],
    }
};

compile(options).then(s1 => {
    options.entry = "./src/readme-template.js";
    options.output.filename = "_readme-template.js";

    console.log("");
    return compile(options).then(s2 => {
        var fs = require("fs");

        var code = fs.readFileSync(options.output.path + "/" + s2.assetsByChunkName.main);
        var content = require("vm").runInNewContext(code)(options.output.publicPath + s1.assetsByChunkName.main);
        fs.writeFileSync(options.output.path + "/README.md", content);
    })
})