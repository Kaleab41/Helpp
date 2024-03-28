import { Button } from "flowbite-react";
import notFoundImg from "../../assets/404.svg";

const NotFound = () => {

    return (
        <div className="flex items-center flex-col w-full">
            <img src={notFoundImg} alt="Can't find what you're looking for!" className="max-w-[640px] max-h-[430px]" />

            <div className="flex flex-col gap-2 justify-center items-center">
                <p className="text-4xl font-bold text-center">Page not found</p>
                <p className="text-sm text-gray-500">Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.</p>

                <Button color="blue" size="xl" className="w-fit">Go back home</Button>

            </div>
        </div>
    );
}

export default NotFound;