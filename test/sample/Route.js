const imageTests = [
	{ name: "PNG", url: "https://www.gstatic.com/webp/gallery3/1.png" },
	{ name: "JPG", url: "https://www.gstatic.com/webp/gallery/1.jpg" },
	{ name: "SVG", url: "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/410.svg" },
	{ name: "GIF", url: "https://www.w3schools.com/images/html5.gif" },
	{ name: "WEBP", url: "https://www.gstatic.com/webp/gallery/1.webp" }
];

const imageTestsWithExtensionsInCaps = [
	{ name: "PNG", url: "https://www.gstatic.com/webp/gallery3/1.PNG" },
	{ name: "JPG", url: "https://www.gstatic.com/webp/gallery/1.JPG" },
	{ name: "SVG", url: "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/410.SVG" },
	{ name: "GIF", url: "https://www.w3schools.com/images/html5.GIF" },
	{ name: "WEBP", url: "https://www.gstatic.com/webp/gallery/1.WEBP" }
];

/**
 * @todo capture images with queries after their extension name.
 */

const videoTests = [
	{ name: "MP4", url: "http://techslides.com/demos/sample-videos/small.mp4" },
	{ name: "OGV", url: "http://techslides.com/demos/sample-videos/small.ogv" },
	{ name: "OGG", url: "https://file-examples.com/wp-content/uploads/2018/04/file_example_OGG_480_1_7mg.ogg" },
	{ name: "WEBM", url: "http://techslides.com/demos/sample-videos/small.webm" },
	{ name: "FLV", url: "http://techslides.com/demos/sample-videos/small.flv" },
	{ name: "MKV", url: "https://sample-videos.com/video123/mkv/720/big_buck_bunny_720p_1mb.mkv" },
	{ name: "3GP", url: "https://sample-videos.com/video123/3gp/144/big_buck_bunny_144p_1mb.3gp" }
];

const videoTestsWithExtensionsInCaps = [
	{ name: "MP4", url: "http://techslides.com/demos/sample-videos/small.MP4" },
	{ name: "OGV", url: "http://techslides.com/demos/sample-videos/small.OGV" },
	{ name: "OGG", url: "https://file-examples.com/wp-content/uploads/2018/04/file_example_OGG_480_1_7mg.OGG" },
	{ name: "WEBM", url: "http://techslides.com/demos/sample-videos/small.WEBM" },
	{ name: "FLV", url: "http://techslides.com/demos/sample-videos/small.FLV" },
	{ name: "MKV", url: "https://sample-videos.com/video123/mkv/720/big_buck_bunny_720p_1mb.MKV" },
	{ name: "3GP", url: "https://sample-videos.com/video123/3gp/144/big_buck_bunny_144p_1mb.3GP" }
];

/**
 * @todo capture video with queries after their extension name.
 */

const audioTests = [
	{ name: "WAVE", url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_WAV_1MG.wav" },
	{ name: "MP3", url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3" },
	{ name: "OGG", url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_OOG_1MG.ogg" }
];

const audioTestsWithExtensionsInCaps = [
	{ name: "WAVE", url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_WAV_1MG.WAV" },
	{ name: "MP3", url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.MP3" },
	{ name: "OGG", url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_OOG_1MG.OGG" }
];

/**
 * @todo capture audios with queries after their extension name.
 */

const assetTests = [
	{ name: "HTM", url: "http://help.websiteos.com/websiteos/example_of_a_simple_html_page.htm" },
	{ name: "HTML", url: "https://www.w3.org/Style/Examples/011/firstcss.en.html" },
	{ name: "JAVASCRIPT", url: "https://static.npmjs.com/package/package.109c8649065b8c37a2f1.js" },
	{ name: "CSS", url: "https://static.npmjs.com/styles.a34b113ba89c0a069aa9.css" }
];

const assetTestsWithExtensionsInCaps = [
	{ name: "HTM", url: "http://help.websiteos.com/websiteos/example_of_a_simple_html_page.HTM" },
	{ name: "HTML", url: "https://www.w3.org/Style/Examples/011/firstcss.en.HTML" },
	{ name: "JAVASCRIPT", url: "https://static.npmjs.com/package/package.109c8649065b8c37a2f1.JS" },
	{ name: "CSS", url: "https://static.npmjs.com/styles.a34b113ba89c0a069aa9.CSS" }
];

export {
	imageTests,
	imageTestsWithExtensionsInCaps,
	videoTests,
	videoTestsWithExtensionsInCaps,
	audioTests,
	audioTestsWithExtensionsInCaps,
	assetTests,
	assetTestsWithExtensionsInCaps
};
