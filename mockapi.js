const Router = require("koa-router");
const route = new Router();
const Mock = require("mockjs");

const idList = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  "list|1-100": [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      "id|+1": 1,
    },
  ],
});

route.get("/queryids", (ctx) => {
  ctx.response.body = idList;
});
const contrys = Mock.mock({
  "countries|4-6": [
    {
      "countryId|+1": 1,
      area: "@integer(100)",
      country: "@ctitle(1, 3)" + "国",
      "provinces|7-9": [
        {
          "provinceId|+1": 1,
          province: "@cword(2, 3)" + "省",
          "cities|4-6": [
            {
              "cityId|+1": 1,
              city: "@ctitle(2, 3)" + "市",
              "peoples|5-15": [
                {
                  "id|+1": 1,
                  guid: "@guid",
                  name: "@cname",
                  age: "@integer(20, 50)",
                  birthday: '@date("MM-dd")',
                  email: "@email",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
route.post("/postcomplexData", async (ctx, next) => {
  // console.log('ctx',ctx.request.body)
  ctx.body = {
    status: 200,
    data: contrys,
    info: "请求成功",
  };
});
const peopleList = Mock.mock({
  "persons|20": [
    {
      name: "@cname",
      age: "@integer(20, 50)",
      address: "@ctitle(2, 3)" + "市",
    },
  ],
});
route.post("/queryPeople", async (ctx, next) => {
  // console.log('ctx',ctx.request.body)
  ctx.body = {
    status: 200,
    data: peopleList,
    info: "请求成功",
  };
});

route.post("/authCode", async (ctx, next) => {
  // console.log('ctx',ctx.request.body)
  ctx.body = {
    status: 200,
    data: Mock.mock("@increment(1000)"),
    info: "请求成功",
  };
});

route.post("/login", async (ctx, next) => {
  console.log('ctx',ctx.request)
  const { phone = "" } = ctx.request.body;
  let status = 200
  let data = {
    phone: phone,
    token: Mock.mock("@guid()"),
    usrId: Mock.mock("@id()"),
    name: Mock.mock("@cname()"),
  }
  let info = '请求成功'
  if (phone.length !== 11) {
      data = {}
      info = '请使用正确的手机号'
      status = 300
  }
  ctx.body = {
    status: status,
    data: data,
    info: info,
  };
});

// route 测试
module.exports = route;
