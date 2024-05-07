import { useOutsideClick } from "hooks/useOutsideClick";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<List>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;

  z-index: 99;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type List = {
  $position: { x: number; y: number };
};

type Position = {
  x: number;
  y: number;
};

type MenuContextProps = {
  openId: string | number;
  open: React.Dispatch<React.SetStateAction<string | number>>;
  close: () => void;
  position: Position | null;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
};

const MenuContext = createContext<MenuContextProps>({
  openId: "",
  open: () => {},
  close: () => {},
  position: null,
  setPosition: () => {},
});

type MenuProps = {
  children: React.ReactNode;
};

function Menus({ children }: MenuProps) {
  const [openId, setOpenId] = useState<string | number>("");
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenuContext.Provider value={{ openId, open, close, position, setPosition }}>
      {children}
    </MenuContext.Provider>
  );
}

type ToggleProps = {
  id: number;
};
function Toggle({ id }: ToggleProps) {
  const { openId, open, close, setPosition } = useContext(MenuContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

type ListProps = {
  children: React.ReactNode;
  id: number;
};
function List({ children, id }: ListProps) {
  const { openId, close, position } = useContext(MenuContext);
  const ref = useOutsideClick(close);

  if (id !== openId) return null;

  return createPortal(
    <StyledList
      ref={ref as React.RefObject<HTMLUListElement>}
      $position={position ?? { x: 0, y: 0 }}
    >
      {children}
    </StyledList>,
    document.body
  );
}
type ButtonProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
};
function Button({ children, onClick, icon }: ButtonProps) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
