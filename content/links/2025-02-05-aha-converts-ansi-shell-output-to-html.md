+++
title = "aha converts ANSI shell output to HTML"
url = "https://github.com/theZiz/aha"
[taxonomies]
tags = ["shell", "html", "tool"]
+++


[aha](https://github.com/theZiz/aha) converts ANSI escape sequeneces, like those used for coloured shell output, into HTML.

I tried:

```shell
brew install aha
echo -e "\033[34mHello\033[0m" | aha
```

and got the output

```html
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!-- This file was created with the aha Ansi HTML Adapter. https://github.com/theZiz/aha -->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="application/xml+xhtml; charset=UTF-8"/>
<title>stdin</title>
</head>
<body>
<pre>
<span style="color:blue;">Hello</span>
</pre>
</body>
</html>
```

which is indeed the world _Hello_ in blue.

If I want to include the HTML output in another page, such as this blog post, the `—no-header` option gives you just the body contents:

```
echo -e "\033[34mHello\033[0m" | aha -n
```

<span style="color:blue;">Hello</span>

Great tip from [Jujutsu VCS Introduction and Patterns | Kuba Martin](https://kubamartin.com/posts/introduction-to-the-jujutsu-vcs/) by [Kuba Martin](https://kubamartin.com/).
