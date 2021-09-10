const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin') //to extract css out of bundle.js into a new file

module.exports = (env) => {
    const isProduction = env === 'production'
    const CSSExtract = new ExtractTextPlugin('styles.css')

    return {
        entry: './src/app.js', //relative path
        output: {
            path: path.join(__dirname, 'public'), //ABSOLUTE PATH IS MANDATORY HERE!
            filename: 'bundle.js'
        },
        module: {
            //let webpack know .js files in our application need babel to convert jsx to ES5 javascript
            //exclude js files in node_modules folder
            rules: [{
                loader: 'babel-loader', //for single loader
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
            test: /\.s?css$/,
            // use: [ //for multiple loaders
            //     'style-loader', //loads css converted into js (by css-loader) into style tags to render in DOM
            //     'css-loader', //converts css to js 
            //     'sass-loader' //converts sass/scss files to css (using node-sass internally) (Browser doesn't understand sass/scss)
            // ] 
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true //to see actual css file location in dev tools rather than styles.css location
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' :'inline-source-map', //makes debugging easier in browser's Dev tools (F12) by pointing console.logs or errors to actual source js file rather than bundle.js
        //source-map is very very slow to build, but it suits production since rebuilds are not quite often there. This creates a separate map file which ONLY loads if someone opens dev tools
        //i.e, only our application's core js is  present in the bundle.js now which leads to a much lighter and faster application
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true //404's will fallback to /index.html
            //i.e.,whenever a route gives 404 since that route is fetched from server side, dev server re-renders index.html for all such routes
            //index.html uses bundle.js which is generated from app.js. In app.js client side routes are defined. So the required route is fetched from there instead of server
        }
    }
}