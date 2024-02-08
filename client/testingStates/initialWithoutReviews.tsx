export const mockStateWithout: any = {
  counter: { value: 0 },
  reviewList: { 
    value: [
      
    ] 
  },
  property: { 
    value: { 
      fullAddress: '22 Godolphin Road, London', 
      property_id: '1234' 
    } 
  },
  fullProperty: {
    value: {
      property_id: '1234',
      fullAddress: '22 Godolphin Road, London',
      num_of_reviews: 0,
      avg_rating: 0,
      updatedAt: new Date('2024-01-31'),
      createdAt: new Date('2024-01-31')
    }
  },
  addReview: { 
    value: {
      t_start: '2024-01-31',
      t_end: '2024-01-31',
      cleanliness: 4,
      cleanliness_comment: 'The cleanliness was exceptional, well-maintained property.',
      maintenance: 5,
      maintenance_comment: 'No maintenance issues observed, everything was in great condition.',
      value_for_money: 5,
      value_for_money_comment: 'Excellent value for money, exceeded expectations.',
      deposit_handling: 4,
      deposit_handling_comment: 'Deposit handling process was fair and transparent.',
      amenities: 5,
      amenities_comment: 'Top-notch amenities, made the living experience luxurious.',
      landlord_responsiveness: 5,
      landlord_responsiveness_comment: 'Landlord was extremely responsive and proactive.',
      total_review_rating: 5,
      monthly_rent: 2500,
      monthly_bill: 250,
      council_tax: 120,
      general_comment: 'Absolutely loved living here, highly recommend!',
      photos: [
        {
          url: 'https://alto-live.s3.amazonaws.com/wvxuv4PRkq8d6Ptl1XeMpfyQWS4/trpskNcSCnw-FTY7tNK-qS43Ut8/Photo/%5B3%5D/hy8rawWs90qec_U6NO2pAQ.jpg',
          tag: 'kitchen',
          photo_id: 3
        },
        {
          url: 'https://alto-live.s3.amazonaws.com/wvxuv4PRkq8d6Ptl1XeMpfyQWS4/trpskNcSCnw-FTY7tNK-qS43Ut8/Photo/%5B3%5D/hy8rawWs90qec_U6NO2pAQ.jpg',
          tag: 'kitchen',
          photo_id: 3
        }
      ]
    }
  },
  addAddress: { 
    description: '22 Godolphin Road, London', 
    place_id: 'addaddressID2344' 
  },
  user: { 
    value: { 
      firstName: 'Joe', 
      lastName: 'Bloggs', 
      email: 'joe@bloggs.com' 
    } 
  },
  auth: {
    value: false
  }
};
