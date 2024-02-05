export const mockStore: any = {
  counter: { value: 0 },
  reviewList: { 
    value: [
      {
        t_start: '2023-01-01',
        t_end: '2023-01-31',
        cleanliness: 3,
        cleanliness_comment: 'The cleanliness was acceptable but could be improved.',
        maintenance: 2,
        maintenance_comment: 'There were some maintenance issues that need attention.',
        value_for_money: 2,
        value_for_money_comment: 'The value for money was moderate considering the amenities.',
        deposit_handling: 3,
        deposit_handling_comment: 'The deposit handling process was smooth and hassle-free.',
        amenities: 4,
        amenities_comment: 'The amenities provided were satisfactory and added value.',
        landlord_responsiveness: 3,
        landlord_responsiveness_comment: 'The landlord was responsive to queries and concerns.',
        total_review_rating: 5,
        monthly_rent: 2000,
        monthly_bill: 200,
        council_tax: 100,
        general_comment: 'Overall, it was a pleasant experience living in this property.',
        photos: [
          {
            url: 'https://alto-live.s3.amazonaws.com/wvxuv4PRkq8d6Ptl1XeMpfyQWS4/trpskNcSCnw-FTY7tNK-qS43Ut8/Photo/%5B3%5D/hy8rawWs90qec_U6NO2pAQ.jpg',
            tag: 'living_room',
            photo_id: 1
          },
          {
            url: 'https://alto-live.s3.amazonaws.com/wvxuv4PRkq8d6Ptl1XeMpfyQWS4/trpskNcSCnw-FTY7tNK-qS43Ut8/Photo/%5B3%5D/hy8rawWs90qec_U6NO2pAQ.jpg',
            tag: 'bedroom',
            photo_id: 2
          }
        ]
      },
      {
        t_start: '2023-02-01', 
        t_end: '2023-02-28',   
        cleanliness: 4,         
        cleanliness_comment: 'The cleanliness was excellent.', 
        maintenance: 3,         
        maintenance_comment: 'Some minor maintenance issues observed.', 
        value_for_money: 4,     
        value_for_money_comment: 'Great value for money.', 
        deposit_handling: 4,    
        deposit_handling_comment: 'Deposit handling was efficient.', 
        amenities: 5,           
        amenities_comment: 'Top-notch amenities.', 
        landlord_responsiveness: 5, 
        landlord_responsiveness_comment: 'Landlord was highly responsive.', 
        total_review_rating: 5, 
        monthly_rent: 2100,     
        monthly_bill: 180,      
        council_tax: 110,       
        general_comment: 'Great living experience overall.', 
        photos: [
          {
            url: 'https://alto-live.s3.amazonaws.com/wvxuv4PRkq8d6Ptl1XeMpfyQWS4/trpskNcSCnw-FTY7tNK-qS43Ut8/Photo/%5B3%5D/hy8rawWs90qec_U6NO2pAQ.jpg',
            tag: 'kitchen',
            photo_id: 3
          },
          {
            url: 'https://alto-live.s3.amazonaws.com/wvxuv4PRkq8d6Ptl1XeMpfyQWS4/trpskNcSCnw-FTY7tNK-qS43Ut8/Photo/%5B3%5D/hy8rawWs90qec_U6NO2pAQ.jpg',
            tag: 'bathroom',
            photo_id: 4
          }
        ]
      },
      {
        t_start: '2023-03-01',  
        t_end: '2023-03-31',    
        cleanliness: 5,         
        cleanliness_comment: 'The cleanliness was outstanding.', 
        maintenance: 4,          
        maintenance_comment: 'Minor maintenance issues resolved promptly.', 
        value_for_money: 5,      
        value_for_money_comment: 'Excellent value for money.', 
        deposit_handling: 5,     
        deposit_handling_comment: 'Deposit handling was quick and fair.', 
        amenities: 5,            
        amenities_comment: 'Luxurious amenities.', 
        landlord_responsiveness: 5, 
        landlord_responsiveness_comment: 'Landlord was always available and helpful.', 
        total_review_rating: 4,  
        monthly_rent: 2200,      
        monthly_bill: 200,       
        council_tax: 120,        
        general_comment: 'Outstanding experience, highly recommended.', 
        photos: [
          {
            url: 'https://alto-live.s3.amazonaws.com/wvxuv4PRkq8d6Ptl1XeMpfyQWS4/trpskNcSCnw-FTY7tNK-qS43Ut8/Photo/%5B3%5D/hy8rawWs90qec_U6NO2pAQ.jpg',
            tag: 'view',
            photo_id: 5
          }
        ]
      }
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
      num_of_reviews: 3,
      avg_rating: 4,
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
  }
};
