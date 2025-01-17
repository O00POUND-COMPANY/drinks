import { Icon } from '~/icons/icon';

export function NoSearchTerm() {
  return (
    <section className="text-center">
      <Icon
        name="arrow_upward-filled"
        aria-label="Arrow Pointing Up"
        className="my-[10vh] inline h-[20vh] w-[20vh] text-burnt-orange"
      />
      <p className="my-5 text-gray-100 md:text-xl">
        Search all drinks by ingredient or description!
      </p>
    </section>
  );
}
