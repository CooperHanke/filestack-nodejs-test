(function() {
    // start the count as the page loads
    var count = 5;
    document.getElementById('count').innerHTML = count.toString();
    document.getElementById('upload').addEventListener("click", startPicking);
    var dropzone = $('#drop-zone');

    function startPicking() {
        var key = '' /* supply your own key here to make this page work */;
        filepicker.setKey(key);
        filepicker.pickMultiple(
            {
                maxFiles: count,
                services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
            },
            // so we can grab the blob but that doesn't help much does it?
            // never you mind, honeychild, we gon' get this chit sorted!
            // turn the blob into something we can use
            function (Blob) {
                // keep an index and use that index in order to give each item a unique tag
                // for putting in a database later
                var index = 1;
                // for each file uploaded, we will inspect the one file
                Blob.forEach(function (upload) {
                    // set the conversion boolean variable to false; if it meets our criteria,
                    // we will pass it through to conversion
                    var convertThis = false;
                    // get all the pieces of the file for later
                    var filename = upload.filename;
                    var friendly_name = filename.substr(0, filename.indexOf('.'));
                    var extension = filename.substr(filename.indexOf('.') + 1, filename.length + 1).toLowerCase(); // filename length + 1 for 0 index
                    var link = upload.url;
                    var type = upload.mimetype;
                    // make a list of known type that can be converted according to the dev docs
                    var extensionsToConvert = [
                        'pdf',
                        'doc',
                        'odt',
                        'xls',
                        'ods',
                        'ppt',
                        'odp',
                        'bmp',
                        'gif',
                        'jpg',
                        'png',
                        'webp',
                        'tiff',
                        'ai',
                        'psd',
                        'svg',
                        'html',
                        'txt'
                    ];
                    for (var i = 0; i < extensionsToConvert.length; i++) {
                        if (extension.indexOf(extensionsToConvert[i]) > -1) {
                            convertThis = true;
                            break;
                        }
                    }
                    // making special anchor tags for downloading
                    var aTag = '<a href="' + link + '" target="_blank">';
                    // check to see if the mime type matches with anything to do with images,
                    // then do all the things
                    if (type.indexOf('image') > -1) {
                        // var image = aTag + '<img class="img-thumbnail" src="' + link + '"></a>';
                        var image = aTag + '<img class="img-thumbnail img-fluid" src="' + link + '" alt="image of ' + filename + '"></a>';
                        dropzone.append(
                            '<li class="list-group-item text-center">\n' +
                            '<div class="row">\n' +
                            '<div class="col">\n' +
                            '<p>' + aTag + filename + '</a></p>' +
                            '</div>' +
                            '<div class="col">' +
                            image +
                            '</div>' +
                            '</div>' +
                            '</li>'
                        );
                    }
                    // if we do need to convert it, check it, and let that happen
                    else if (convertThis === true) {
                        var converted = link + '/convert?format=jpg&page=1&width=400';
                        var preview = aTag + '<img class="img-thumbnail img-fluid" src="' + converted + '"></a>';
                        dropzone.append(
                            // try to add a tag now
                            '<li class="list-group-item text-center clearf">' +
                            '<div class="row">' +
                            '<div class="col">' +
                            '<p>' + aTag + filename + '</a></p>' +
                            '</div>' +
                            '<div class="col">' +
                            preview +
                            '</div>' +
                            '</div>' +
                            '</li>'
                        );
                    }
                    // if it is anything else, let us just get downloadable links, right? right
                    else {
                        dropzone.append(
                            '<li class="list-group-item text-center clearf">' +
                            '<div class="row">' +
                            '<div class="col">' +
                            '<p>' + aTag + filename + '</a></p>' +
                            '</div>' +
                            '<div class="col"></div>' +
                            '<div class="col">' +
                            '</div>' +
                            '</div>' +
                            '</li>'
                        )
                    }

                    // for now, we will make the request before we update the count,
                    // however, we really need to update the count only after the db
                    // is updated - change complete

                    // then make a request to the server, just to see what it says
                    var xhr = new XMLHttpRequest();
                    var url = "/";
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            var json = JSON.parse(xhr.responseText);
                            console.log(json.upload);
                        }
                    };
                    upload['friendly_name'] = friendly_name;
                    var data = JSON.stringify({upload: upload});
                    xhr.send(data);

                    count--;
                    document.getElementById('count').innerHTML = count;
                    index++;
                })
            },
            function (FPError) {
                console.log(FPError.toString());
            });
    }
})();