module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/https://github.com/oskarikinnunen/vuesort/" : "/",
	devServer: { proxy: 'https://github.com/oskarikinnunen/vuesort'}
}