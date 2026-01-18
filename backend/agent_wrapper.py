"""
Simplified Type Definitions for Agent

These replace the referee types and work with your BitBoard.
"""

from dataclasses import dataclass
from typing import Set

# ============================================================================
# SIMPLIFIED TYPE DEFINITIONS (replacing referee types)
# ============================================================================

class PlayerColor:
    """Player color - simplified enum replacement"""
    RED = "red"
    BLUE = "blue"
    
    def __init__(self, color: str):
        self.color = color.lower()
        # Map to single character for BitBoard
        self._char = "r" if color.lower() == "red" else "b"
    
    @property
    def opponent(self):
        return PlayerColor(PlayerColor.BLUE if self.color == PlayerColor.RED else PlayerColor.RED)
    
    def __eq__(self, other):
        if isinstance(other, str):
            return self.color == other.lower() or self._char == other
        return self.color == other.color
    
    def __str__(self):
        return self._char
    
    def __hash__(self):
        return hash(self.color)


@dataclass(frozen=True)
class Coord:
    """Coordinate on the board - toroidal wrapping"""
    r: int
    c: int
    
    def __post_init__(self):
        # Wrap coordinates for toroidal board
        object.__setattr__(self, 'r', self.r % 11)
        object.__setattr__(self, 'c', self.c % 11)
    
    def __str__(self):
        return f"{self.r}-{self.c}"
    
    def __hash__(self):
        return hash((self.r, self.c))
    
    def __add__(self, other):
        """Add with wrapping"""
        return Coord((self.r + other.r) % 11, (self.c + other.c) % 11)
    
    def __sub__(self, other):
        """Subtract with wrapping"""
        return Coord((self.r - other.r) % 11, (self.c - other.c) % 11)


@dataclass(frozen=True)
class PlaceAction:
    """Place action - 4 coordinates"""
    c1: Coord
    c2: Coord
    c3: Coord
    c4: Coord
    
    @property
    def coords(self) -> Set[Coord]:
        return {self.c1, self.c2, self.c3, self.c4}
    
    def __str__(self):
        return f"PLACE({self.c1}, {self.c2}, {self.c3}, {self.c4})"


# Type alias
Action = PlaceAction