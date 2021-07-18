import React from 'react';
import { getUser } from '../../lib/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCheckThread } from '../../store/slices/inboxSlice';
import { setStarThread } from '../../store/slices/userSlice';
import { ToggleIconButton } from '../ToggleIconButton';
import IconButton from '../UI/IconButton';

interface Props {
  thread;
  onClickHandle;
}

export const ThreadListItem = ({ thread, onClickHandle }: Props) => {
  const dispatch = useAppDispatch();
  const myStarThreads = useAppSelector(
    (state) => state.user.userProfile.starThreads
  );
  const CheckedThreads = useAppSelector((state) => state.inbox.checkedThreads);

  return (
    <li onClick={() => onClickHandle()}>
      <div className="flex items-center border-b">
        <ToggleIconButton
          icon="check_box"
          tooltip="check"
          isChecked={CheckedThreads[thread.id] && true}
          onClick={() => {
            dispatch(setCheckThread({ threadId: thread.id }));
          }}
        />
        <ToggleIconButton
          icon="star"
          tooltip="Star"
          isChecked={myStarThreads[thread.id] && true}
          onClick={() => {
            dispatch(setStarThread({ threadId: thread.id }));
            // fetch Star After, if failed cancel setStarThread
          }}
        />
        <h3>{thread.title}</h3>
      </div>
    </li>
  );
};
