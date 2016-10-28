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
        publicPath: "https://mayorovp.github.io/codegolf/",
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
    options.entry = "html?interpolate!./src/index-template.html";
    options.output.filename = "_index-template.js";

    console.log("");
    return compile(options).then(s2 => {
        var fs = require("fs");

        try {
            var code = fs.readFileSync(options.output.path + "/" + s2.assetsByChunkName.main);
            var content = require("vm").runInNewContext(`url => ${code}`)(options.output.publicPath + s1.assetsByChunkName.main);
            fs.writeFileSync(options.output.path + "/index.html", content);
        } catch (ex) {
            console.error(ex);
        }
    })
})