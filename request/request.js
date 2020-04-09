let ajaxNum = 0;
export const request = (params) => {
  ajaxNum++;
  wx.showLoading({
    title: '加载中...',
    mask: true,
  });
  const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((res, rej) => {
    wx.request({
      ...params,
      url: baseURL + params.url,
      success: (result) => {
        res(result.data.message);
      },
      fail: (err) => {
        rej(err)
      },
      complete: () => {
        ajaxNum--;
        if (ajaxNum === 0) {
          wx.hideLoading();
        }
      }

    });

  })
}