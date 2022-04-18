import os

urls = ['https://google.com/get_filehsdghgjhxfjxftdgthzdghzdhgSRgrhzdfghzdghzdghzdhzdfhz.mp4/?rnd=252525423423423/', 'https://google.com/remote_control.php?file=gdhxdghxghxfghxzghxzghxfghxfghxfghxfghxfghzhzdh']


def splitUrls(urls):
    allUrls = []
    for url in urls:
        splitted = url.split('?')
        allUrls.append(splitted)

    allUrls = [item for subList in allUrls for item in subList]
    return fileLinks(allUrls)

def fileLinks(urls):
    fileUrls = []
    for url in urls:
        if '.mp4' in url:
            fileUrls.append(url)
    return fileUrls

for index, url  in enumerate(splitUrls(urls)):
    os.system(f'wget -O teste-{index + 1}.mp4 {url}')
