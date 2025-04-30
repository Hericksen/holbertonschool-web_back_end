#!/usr/bin/env python3
"""
function takes two integer arguments page and page_size
"""

import typing


def index_range(page: int, page_size: int) -> typing.Tuple[int, int]:
    """
    The function should return a tuple of size two containing a start index
    """

    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)
