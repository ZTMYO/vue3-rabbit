import httpInstance from "@/utils/http";
export function getCheckInfoAPI() {
  return httpInstance({
    url: '/member/order/pre',
  });
}