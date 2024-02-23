export type LoginPageApi = {
  displayName: string
  password: string
}
export type NewCustomerPost = {
  customerName: string
  mobileNo: string
  bills: {
    billNumber: string
    billAmt: number
    rewardAction: boolean
    rewardPoints: string
    entryDate: string
    validDate: string
  }[]
}
