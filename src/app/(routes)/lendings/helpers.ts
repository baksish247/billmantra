const mapLendingData = (apiData: any[]) => {
  return apiData.map((item) => {
    const lastPayment = item.payment_timeline.sort(
      (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];

    return {
      id: item._id,
      customerId: item.customer_id?._id,
      name: item.customer_id?.name,
      phone: item.customer_id?.phone,
      lent_amount: item.lent_amount,
      paid_amount: item.paid_amount,
      remaining_amount: item.remaining_amount,
      shop_id: item.shop_id,
      is_paid: item.is_paid,
      payment_timeline: item.payment_timeline.map((payment: any) => ({
        amount: payment.amount,
        date: new Date(payment.date).toISOString().split('T')[0],
        id: payment._id,
      })),
      bill_ids: item.bill_ids,
      is_deleted: item.is_deleted,
      createdAt: new Date(item.createdAt).toISOString().split('T')[0],
      updatedAt: new Date(item.updatedAt).toISOString().split('T')[0],
      lastTransaction: lastPayment
        ? {
            type: 'paid',
            amount: lastPayment.amount,
            date: new Date(lastPayment.date).toISOString().split('T')[0],
          }
        : { type: 'none', amount: 0, date: '' },
    };
  });
};

export default mapLendingData;  