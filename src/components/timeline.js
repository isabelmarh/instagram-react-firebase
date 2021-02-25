import React from 'react';
import Skeleton from 'react-loading-skeleton';
import useFollowedUsersPhotos from '../hooks/use-followed-users-photos';

export default function Timeline() {
    const { photos } = useFollowedUsersPhotos();
    console.log(photos);

    return (
        <div className="container col-span-2">
            {!photos ? (
                <Skeleton count={4} width={640} height={500} className="mb-5" />
            ) : (
                    photos.map((content) => <p>photos</p>)
                )}
        </div>
    );
}