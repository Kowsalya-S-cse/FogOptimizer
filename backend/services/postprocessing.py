def clamp_percent(value):
    return round(max(0, min(100, value)), 2)

def normalize_throughput(tasks, fog_nodes, raw_value):
    return round(tasks / max(1, fog_nodes), 2)