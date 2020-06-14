const allocate = async (target) => {
  const body = {
    passengers: [
      {
        id: 'PAS-1',
        groupId: 'BOOKING-1',
        age: '45',
        itinerary: [
          {
            departure: 'ES',
            arrival: 'GB',
          },
        ],
      },
      {
        id: 'PAS-2',
        groupId: 'BOOKING-1',
        age: '8',
        itinerary: [
          {
            departure: 'ES',
            arrival: 'GB',
          },
        ],
      },
      {
        id: 'PAS-3',
        age: '34',
        specialServiceRequest: 'respiratory-condition',
        itinerary: [
          {
            departure: 'SK',
            arrival: 'ES',
          },
          {
            departure: 'ES',
            arrival: 'GB',
          },
        ],
      },
    ],
    aircraft: 'Boeing 787-8',
    itinerary: {
      departure: 'ES',
      arrival: 'GB',
    },
  };
  const endpoint =
    'https://d606brmdeh.execute-api.eu-west-2.amazonaws.com/dev/seat/allocation';
  target.innerHTML = 'Allocating...';
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify(body),
    mode: 'cors',
  });
  const data = await response.json();
  console.log(data);

  target.innerHTML = 'Allocate!';
  const allocationResponse = document.getElementById('allocationResponse');

  allocationResponse.parentElement.classList.remove('prettyprinted');
  allocationResponse.append(JSON.stringify(data, null, 2));
  PR.prettyPrint();
};

const getPassengerSeat = async (target) => {
  const endpoint =
    'https://d606brmdeh.execute-api.eu-west-2.amazonaws.com/dev/passenger/1/seat/1';
  target.innerHTML = 'Allocating...';
  const response = await fetch(endpoint, {
    method: 'get',
    mode: 'cors',
  });
  const data = await response.json();
  console.log(data);

  target.innerHTML = 'Allocate!';
  const allocationResponse = document.getElementById(
    'getPassengerSeatResponse'
  );

  allocationResponse.parentElement.classList.remove('prettyprinted');
  allocationResponse.append(JSON.stringify(data, null, 2));
  PR.prettyPrint();
};

const setMapAllocation = async (target) => {
  const endpoint =
    'https://d606brmdeh.execute-api.eu-west-2.amazonaws.com/dev/seat/allocation/234324';
  target.innerHTML = 'Allocating...';
  const response = await fetch(endpoint, {
    method: 'get',
    mode: 'cors',
  });
  const data = await response.json();
  console.log(data);

  target.innerHTML = 'Allocate!';
  const allocationResponse = document.getElementById('setMapAllocation');

  allocationResponse.parentElement.classList.remove('prettyprinted');
  allocationResponse.append(JSON.stringify(data, null, 2));
  PR.prettyPrint();
};
