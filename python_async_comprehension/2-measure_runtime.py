import asyncio
from 1_async_comprehension import async_comprehension
import time

async def measure_runtime():
    """Measures the total runtime of running async_comprehension four times in parallel."""
    start_time = time.perf_counter()
    await asyncio.gather(async_comprehension(), async_comprehension(), async_comprehension(), async_comprehension())
    end_time = time.perf_counter()
    return end_time - start_time
