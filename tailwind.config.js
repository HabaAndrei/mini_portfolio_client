module.exports = {

    content: [
        "./node_modules/flowbite/**/*.js",
        './src/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite-react/lib/esm/**/*.js'


    ], 
    theme: {
        extend: {},
      },
      plugins: [
        require('flowbite/plugin')

      ],

}
