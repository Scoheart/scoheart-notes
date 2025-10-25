```objective-c
//
//  ViewController.m
//  demo2
//
//  Created by Scoheart on 2024/11/12.
//

#import "ViewController.h"

@interface ViewController ()
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // 配置 Webview
    WKWebViewConfiguration *configuration = [[WKWebViewConfiguration alloc] init];
    [configuration.userContentController addScriptMessageHandler:self name:@"iOSHandler"];

    // 初始化 Webview
    self.webView = [[WKWebView alloc] initWithFrame:self.view.bounds configuration:configuration];
    [self.view addSubview:self.webView];

    // 加载远程URL
    NSURL *url = [NSURL URLWithString:@"http://localhost:5173/"];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [self.webView loadRequest:request];
}

// 实现 WKScriptMessageHandler 协议方法，用于接收 H5 页面发送的消息
// 处理从H5发送的消息
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
    if ([message.name isEqualToString:@"iOSHandler"]) {
        // 处理H5发送的消息
        NSString *messageBody = message.body;
        NSLog(@"Received message from H5: %@", messageBody);
        // 弹出弹窗
        UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"消息"
                                                                       message:[NSString stringWithFormat:@"H5 发来消息: %@", message.body]
                                                                preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *okAction = [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:nil];
        [alert addAction:okAction];
        [self presentViewController:alert animated:YES completion:nil];
     }
}

@end

```
