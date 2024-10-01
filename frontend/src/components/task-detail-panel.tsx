// Task Detail Panel, can switch between modal and drawer mode
import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  CloseButton,
  IconButton,
  Flex,
  HStack,
  Editable,
  EditablePreview,
  EditableInput,
  Text
} from '@chakra-ui/react';
import { LuSquareDot, LuExternalLink, LuPanelRight } from "react-icons/lu";
import { TaskDetail, MockTaskSummary } from '@/models/task';

interface TaskDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskDetailPanel: React.FC<TaskDetailPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const [taskDetail, setTaskDetail] = useState<any>(null);
  const [displayMode, setDisplayMode] = useState<string>("");

  useEffect(() => {
    setDisplayMode(
      JSON.parse(localStorage.getItem("TaskDetailPanel.displayMode")) || "modal"
    );

    if (isOpen) {
      // TODO: fetch task detail
      setTaskDetail(MockTaskSummary as TaskDetail);
    }
  }, [isOpen]);

  const onDisplayModeChange = (mode: "modal" | "drawer") => {
    localStorage.setItem("TaskDetailPanel.displayMode", JSON.stringify(mode));
    setDisplayMode(mode);
  }

  const TaskDetailPanelHeader = () => {
    const modeBtnList = [
      {
        label: "modal",
        icon: <LuSquareDot />,
        onClick: () => onDisplayModeChange("modal"),
      },
      {
        label: "drawer",
        icon: <LuPanelRight />,
        onClick: () => onDisplayModeChange("drawer"),
      },
      {
        label: "external",
        icon: <LuExternalLink />,
        onClick: () => {/* TODO: new window */},
      },
    ]

    return (
      <Flex alignItems="flex-start">
        <ModalHeader flex="1">
          <Editable defaultValue={taskDetail?.title}>
            <EditablePreview/>
            <EditableInput w="80%"/>
            <Text
              as="span"
              fontWeight="normal"
              color="gray.400"
              ml={2}
            >
              {`#${taskDetail?.local_id}`}
            </Text>
          </Editable>
        </ModalHeader>
        <HStack spacing={6} ml="auto" mt={3} mr={3}>
          <HStack spacing={1}>
            {modeBtnList.map(mode => (
              <IconButton 
                key={mode.label} 
                aria-label={mode.label}
                icon={mode.icon} 
                variant="ghost" 
                size="sm"
                fontSize="15px"
                onClick={mode.onClick}
                isActive={displayMode === mode.label}
              />
            ))}
          </HStack>
          <CloseButton onClick={onClose}/>
        </HStack>
      </Flex>
    )
  }
  
  if (displayMode === "modal") {
    return (
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        isCentered
        size="3xl"
        autoFocus={false}
      >
        <ModalOverlay />
        <ModalContent>
          <TaskDetailPanelHeader />
        </ModalContent>
      </Modal>
    )
  } else if (displayMode === "drawer") {
    return (
      <Drawer 
        isOpen={isOpen} 
        onClose={onClose}
        size="xl"
        autoFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <TaskDetailPanelHeader />
        </DrawerContent>
      </Drawer>
    )
  } else return <React.Fragment />
}

export default TaskDetailPanel;