
当你下载一个包的时候，即 npm install xxx 的时候，如果这个包，提供了「二进制可执行文件」，那么提供的二进制可执行文件，会被「软链接」在你当前项目的「./node_modules/.bin」下面。

例如 flow-bin 这个npm包，就提供了一个「二进制可执行文件」： flow

你可以在 ./node_modules/.bin 下面看到它，也就是 ./node_modules/.bin/flow 这个二进制可执行文件

如果要执行它，可以直接通过路径找到他执行，也就是 ./node_modules/.bin/flow 这样执行。


但是每次要慢慢找，输入这么多路径太麻烦了。所以 npm 提供了一个便利的方式，也就是 package.json 中的 scripts 字段。

你可以在 scripts 字段中，添加 ./node_modules/.bin 中的二进制可执行文件，例如

{
	"scripts": {
		"use-flow": "flow"
	}
}

现在就可以通过 npm run-script <command> 或者 npm run <command> 。来更加便捷的执行你要执行的「二进制可执行文件」了。这里的 <command> 就是你配置的 json 对象的 key， 要执行的「二进制可执行文件」名称，就是这个 key 对应的 value。

例如上面的就为 npm run-script use-flow


实际上，npm run-script <command> 或者 npm run <command> 的执行原理是这样的：

首先，你执行这条命令的时候，会把你当前目录下的 ./node_modules/.bin 目录追加到 PATH 环境变量中。

然后由于 PATH 中有这个目录了，其实也就可以直接在命令行使用 flow 了， 只不过这里是 npm 帮你调用了。

你可以配置一个这样的命令来观测环境变量的改变（可以预先打印一下 PATH 截图， 然后观测 通过 npm run 运行出来的有什么区别）


{
	"scripts": {
		"use-flow": "echo $PATH; flow"
	}
}

这里的 echo $PATH; flow
- echo $PATH 代表打印 PATH 环境变量
- flow 代表执行 flow




























