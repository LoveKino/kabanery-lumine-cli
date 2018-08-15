module.exports = ({
  title = 'index'
}) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1"> 
    <meta name="format-detection" content="telphone=yes, email=yes"/>
    <meta name="HandheldFriendly" content="true"/>
    <title>${title}</title>
    <style>
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }

        #pager {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
</body>
</html>`;
};
