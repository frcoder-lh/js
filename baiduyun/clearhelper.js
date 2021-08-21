console.info(`
=========================================百度云清理小助手（帮助文档）=========================================
1. 点击全部文件，点击左侧视频列表，随便删除一个视频
2. 在console Network 面板里搜索 categorylist 获取其url为categorylistUrl
2. 在console Network 面板里搜索 filemanager 获取其url为filemanagerDeleteUrl
2. 在console Network 面板里搜索 api/list 获取其url为listFilesUrl
3. 创建清理小助手： h = createHelper(categorylistUrl, filemanagerDeleteUrl, listFilesUrl, iconUrl)
4. 清理无效视频： h.clearFiles()
4. 清理空文件夹： h.clearDirs()
=========================================百度云清理小助手（帮助文档）=========================================
`);

/**
 * 创建百度云助手
 *
 * @param categorylistUrl 点击左侧视频列表，在console Network 面板里搜索 categorylist 获取其url
 * "https://pan.baidu.com/api/categorylist?order=time&desc=1&showempty=0&web=1&page=1&num=100&category=1&t=0.7665578685199408&channel=chunlei&web=1&app_id=250528&bdstoken=85c085d4f3fd82b785e02bc36242f148&logid=MTU5NTMwOTQ4NTI5MjAuMjM1NDc0MDQ4MzU1NzIwMjg=&clienttype=0"
 *
 * @param filemanagerDeleteUrl 随便删除一个视频，在console Network 面板里搜索 filemanager 获取其url
 * "https://pan.baidu.com/api/filemanager?opera=delete&async=2&onnest=fail&channel=chunlei&web=1&app_id=250528&bdstoken=85c085d4f3fd82b785e02bc36242f148&logid=MTU5NTMxNDc0ODMwNjAuNDI5Mjc2NDUxMDE5ODE0Ng==&clienttype=0"
 *
 * @param listFilesUrl 点击全部文件，在console Network 面板里搜索 api/list 获取其url为listFilesUrl
 * "https://pan.baidu.com/api/list?order=time&desc=1&showempty=0&web=1&page=1&num=100&dir=%2F&t=0.04184418321973671&channel=chunlei&web=1&app_id=250528&bdstoken=85c085d4f3fd82b785e02bc36242f148&logid=MTU5NTM4MjU3NjU4MTAuNjk1MTQ5OTk1NDkyMzU2Mw==&clienttype=0&startLogTime=1595382576582"
 *
 * @param iconUrl 无效视频的icon链接
 * categorylist接口返回结果的.info.thumbs.icon
 *
 */
function createHelper(categorylistUrl, filemanagerDeleteUrl, listFilesUrl, iconUrl) {

    return {

        /**
         * debug数据暴露点
         */
        debugData: {},

        debugClearFiles: function (startPage) {
            this.clearFiles(startPage, true);
        },

        /**
         * 清理无效视频
         *
         * @param startPage 从第几页开始清理，默认值为1
         *
         * @param debug debug为true时，只处理第一页
         */
        clearFiles: async function (startPage, debug) {

            const deleteBase64 = iconUrl ? await getBase64(iconUrl) : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIARgBGAAD/2wBDAAsHCAkIBwsJCQkMCwsNEBoREA8PECAXGBMaJiIoKCYiJSQqMD0zKi05LiQlNUg1OT9BREVEKTNLUEpCTz1DREH/2wBDAQsMDBAOEB8RER9BLCUsQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUH/wAARCAA8ADwDASIAAhEBAxEB/90ABAAE/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1yiiigAooooAKKKKACvI/2hP+YD/28f8AtKvXK8j/AGhP+YD/ANvH/tKgD//Q9alcouQASSAATjqabun/AOecf/fZ/wAKJ/ur/vr/ADrJ1FpRfGNdQvIdxGESDcoz8o+b6gn8aANcNL3RAPZs/wBKwTeeLO2mWf8Aqyfv/wAW7p97pipbv7RZlTLql4245Ajtw2cEkjgde34UySW4jYI+pXudoORbA8FTjnp/DmgDR06XU5FkN9bQxEbdgV87uOc9cc1a3T/884/++z/hWNJeBmjmF7fCMgHy1g5bHXtkdf0qW+uvOVGivbq23h1GyHcMjHJyD6HHrmgDU8yRWUOigMcZDZ7fSvJ/2hP+YD/28f8AtKvUbe4S5jjePftEpX51IPAPrXl37Qn/ADAf+3j/ANpUAf/R9Yn+6v8Avr/Oqlzp9xNMzrqVxCrHIRMYXjHp+P1q8yq67WUMD2IzTPs8H/PGP/vkUAUf7Ludwb+1brjqPlwec+n4VZs7WW3ZjJeSzhgBh8fLjuPrUv2eD/njH/3yKPs8H/PGP/vkUASUVH9ng/54x/8AfIo+zwf88Y/++RQATfei/wB/+hryf9oT/mA/9vH/ALSr1lYYlYMsSAjoQoryb9oT/mA/9vH/ALSoA//S9coryP8A4Xp/1Lf/AJPf/a6P+F6f9S3/AOT3/wBroA9coryP/hen/Ut/+T3/ANro/wCF6f8AUt/+T3/2ugD1yivI/wDhen/Ut/8Ak9/9ro/4Xp/1Lf8A5Pf/AGugD1yvI/2hP+YD/wBvH/tKj/hen/Ut/wDk9/8Aa65D4heOv+E0+wf8S37F9k8z/lv5m/ft/wBkYxt/WgD/2Q==";

            for (let page = startPage || 1; ; page++) {
                console.info(">>>>>> 正在检查第" + page + "页：");
                let files = await getFileListByCategory(page);
                if (files.length == 0) break; // 没有文件说明已经扫描完毕
                let invalidVideoPaths = await findInvalidVideoPaths(deleteBase64, files);
                if (invalidVideoPaths.length != 0) {
                    console.info(">>>>>> 第" + page + "页检查完毕，发现了" + invalidVideoPaths.length + "个无效视频，正在清理：" + invalidVideoPaths);
                    await deleteFiles(invalidVideoPaths, "第" + page + "页");
                } else {
                    console.info(">>>>>> 第" + page + "页检查完毕，没有无效视频");
                }
                if (debug) debugger;
            }
            console.info(">>>>>> 整个网盘已清理完毕（无效视频） <<<<<<");
        },

        debugClearDirs: async function (rootPath) {
            this.clearDirs(rootPath, true);
        },
        /**
         * 清理空文件夹
         *
         * @param rootPath 根目录path
         *
         * @param debug debug为true时，只处理第一页
         */
        clearDirs: async function (rootPath, debug) {

            class DirNode {

                constructor(path) {
                    this.path = path;
                    this.hasFiles = false;
                    this.EmptyDirs = [];
                    this.NoEmptyDirs = [];
                }
            }

            let rootDir = this.debugData.rootDir = new DirNode(rootPath || "/");
            await markEmptyDir(rootDir);
            console.info(">>>>>> 整个网盘已扫描完毕，正在整理空文件夹");
            console.dir(rootDir);

            let emptyDirPaths = collectEmptyDirPaths(rootDir);
            console.info(">>>>>> 整理完毕，发现了" + emptyDirPaths.length + "个空文件夹，正在清理：" + emptyDirPaths);
            for (let i = 0; i <= emptyDirPaths.length; i = i + 50) {
                let files = emptyDirPaths.slice(i, i + 50);
                await deleteFiles(files, "第" + i + "个到" + (i + files.length) + "个空文件夹");
            }
            console.info(">>>>>> 整个网盘已清理完毕（空文件夹） <<<<<<");


            /**
             * 构建目录树
             * @return 该目录是否可以删除
             */
            async function markEmptyDir(root) {
                console.debug(">>>>>> 正在扫描：" + root.path);
                if (debug) debugger;
                let files = await getFileListByPath(root.path);
                if (files.length != 0) {
                    for (let child of files) {
                        if (child.isdir) {
                            let childDir = new DirNode(child.path);
                            let childIsEmpty = await markEmptyDir(childDir);
                            childIsEmpty ? root.EmptyDirs.push(childDir) : root.NoEmptyDirs.push(childDir);
                        } else {
                            root.hasFiles = true;
                        }
                    }
                    return root.hasFiles == false && root.NoEmptyDirs.length == 0;
                } else {
                    return true;
                }
            }

            /**
             * 寻找空目录
             */
            function collectEmptyDirPaths(root) {
                let emptyDirPaths = root.EmptyDirs.map(f => f.path);
                for (let file of root.NoEmptyDirs) {
                    emptyDirPaths = emptyDirPaths.concat(collectEmptyDirPaths(file));
                }
                return emptyDirPaths;
            }
        }
    };


    /**
     * 寻找无效视频
     */
    async function findInvalidVideoPaths(deleteBase64, files) {
        let invalidVideoPaths = [];
        for (let f of files) {
            if (f.category == 1) {
                console.debug(">>>>>> 正在扫描：" + f.path);
                if (deleteBase64 == await getBase64(f.thumbs.icon)) {
                    invalidVideoPaths.push(f.path);
                }
            }
        }
        return invalidVideoPaths;
    }

    /**
     * 从Category（文件类型列表）获取文件列表
     */
    async function getFileListByCategory(page) {
        let r = await fetch(categorylistUrl.replace(/(?<=page=).*?(?=&)/, page), {
            "credentials": "include",
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrer": "https://pan.baidu.com/disk/home?",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": null,
            "method": "GET",
            "mode": "cors"
        }).then(function (response) {
            return response.json();
        });
        return r.info;
    }

    /**
     * 从Path（文件夹）获取文件列表
     */
    async function getFileListByPath(path) {
        let r = await fetch(listFilesUrl.replace(/(?<=dir=).*?(?=&)/, encodeURIComponent(path)), {
            "credentials": "include",
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": "https://pan.baidu.com/disk/home?",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": null,
            "method": "GET",
            "mode": "cors"
        }).then(function (response) {
            return response.json();
        });
        return r.list;
    }

    /**
     * 批量删除文件或文件夹
     */
    async function deleteFiles(paths, info) {
        paths = paths.map(path => '"' + path + '"');
        let body = "filelist=" + encodeURIComponent('[' + paths + ']');
        let r = await fetch(filemanagerDeleteUrl, {
            "credentials": "include",
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "pragma": "no-cache",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": "https://pan.baidu.com/disk/home?",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": body,
            "method": "POST",
            "mode": "cors"
        }).then(function (response) {
            return response.json();
        });
        if (r.errno == 0) {
            console.info(">>>>>> " + info + "清理成功");
        } else {
            console.error(">>>>>> " + info + "清理失败");
        }
    }

    /**
     * 获取图片的Base64编码
     * @param url 图片的url
     */
    function getBase64(url) {
        return new Promise(function (resolve, reject) {
            fetch(url).then(r => r.blob()).then(blob => {
                let oFileReader = new FileReader();
                oFileReader.onloadend = function (e) {
                    let base64 = e.target.result;
                    resolve(base64);
                };
                oFileReader.readAsDataURL(blob);
            });
        });
    }
}