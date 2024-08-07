'use client'
import MeetingTypeList from '@/components/MeetingTypeList';
import { useGetCalls } from '@/hooks/useGetCalls';

const Home = () => {
  const now = new Date();
  const adjustedTime = new Date(now.getTime()); // Add 2 hours in milliseconds
  const time = adjustedTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  const { upcomingCalls } = useGetCalls();
  const latestCall = upcomingCalls?.[0] || null;

  let upcomingMeetingText = 'No Upcoming Meetings';
  
  if (latestCall && latestCall.state.startsAt) {
    const latestCallDate = new Date(latestCall.state.startsAt);
    const isToday = now.toDateString() === latestCallDate.toDateString();
    const latestCallTime = latestCallDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    upcomingMeetingText = isToday 
      ? `Upcoming Meeting at: ${latestCallTime}`
      : `Upcoming Meeting on ${latestCallDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${latestCallTime}`;
  }

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            {upcomingMeetingText}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-7xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;





